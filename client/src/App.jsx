import React, { Component } from 'react';
import Web3 from 'web3';
import LivretDeFamilleContract from './contracts/LivretDeFamille.json';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importez le CSS Bootstrap

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: [],
      contract: null,
      nomEpoux: '',
      nomEpouse: '',
      dateMariage: 0,
      enfants: [],
      nouveauNomEpoux: 'Epoux', // Ajout du champ pour le nouveau nom de l'époux
      nouveauNomEpouse: 'Epouse', // Ajout du champ pour le nouveau nom de l'épouse
    };
  }

  async componentDidMount() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        // Fallback pour un fournisseur Web3 en local (à des fins de test).
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      }

      const web3 = window.web3;

      // Obtenez les comptes Ethereum de l'utilisateur.
      const accounts = await web3.eth.getAccounts();

      console.log('Comptes Ethereum :', accounts);

      const contractAddress = LivretDeFamilleContract.networks[11155111].address;
      console.log('Adresse du contrat :', contractAddress);

      const contract = new web3.eth.Contract(
        LivretDeFamilleContract.abi,
        contractAddress,
      );

      this.setState({ web3, accounts, contract });
      console.log("Contrat initialisation ", contract);
      console.log("this.state ", this.state);
    } catch (error) {
      console.error(error);
    }
  }
  handleAjouterEnfant = async () => {
    const { accounts, contract, nouvelleAdresseEnfant } = this.state;

    try {
      await contract.methods.ajouterEnfant(nouvelleAdresseEnfant).send({ from: accounts[0] });

      // Mettez à jour l'état pour refléter les nouvelles informations
      const infosContrat = await contract.methods.obtenirInformations().call();
      this.setState({
        nomEpoux: infosContrat[0],
        nomEpouse: infosContrat[1],
        dateMariage: infosContrat[2],
        enfants: infosContrat[3],
        nouvelleAdresseEnfant: '', // Remettre à zéro après l'ajout d'un enfant
      });
    } catch (error) {
      console.error(error);
    }
  }
  handleDivorce = async () => {
    const { accounts, contract } = this.state;
  
    try {
      await contract.methods.divorcer().send({ from: accounts[0] });
  
      // Mettez à jour l'état après le divorce
      const infosContrat = await contract.methods.obtenirInformations().call();
      this.setState({
        nomEpoux: infosContrat[0],
        nomEpouse: infosContrat[1],
        dateMariage: infosContrat[2],
        enfants: infosContrat[3],
      });
    } catch (error) {
      console.error(error);
    }
  }
  handleDeces = async () => {
    const { accounts, contract } = this.state;
  
    try {
      await contract.methods.deces().send({ from: accounts[0] });
  
      // Mettez à jour l'état après le décès
      const infosContrat = await contract.methods.obtenirInformations().call();
      this.setState({
        nomEpoux: infosContrat[0],
        nomEpouse: infosContrat[1],
        dateMariage: infosContrat[2],
        enfants: infosContrat[3],
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleNomEpouxChange = (event) => {
    this.setState({ nouveauNomEpoux: event.target.value });
  }

  handleNomEpouseChange = (event) => {
    this.setState({ nouveauNomEpouse: event.target.value });
  }
  

  // Fonction pour créer un livret de famille
  creerLivretFamille = async () => {
    const { accounts, contract, nouveauNomEpoux, nouveauNomEpouse, dateMariage } = this.state;
    console.log("Contenu du contrat", contract);
    try {
      console.log('Contenu du contrat 1', this.state);
      await contract.methods.creerLivretFamille(nouveauNomEpoux, nouveauNomEpouse, dateMariage).send({ from: accounts[0] });
      const infosContrat = await contract.methods.obtenirInformations().call();
      this.setState({
        nomEpoux: infosContrat[0],
        nomEpouse: infosContrat[1],
        dateMariage: infosContrat[2],
        enfants: infosContrat[3],
      });
    } catch (error) {
      console.error(error);
    }

  }

  render() {
    return (
      <div className="container mt-5">
        <h1 className="mb-4 text-primary">Livret de Famille</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nouveauNomEpoux" className="text-info">Nom de l'époux</label>
              <input
                type="text"
                className="form-control"
                id="nouveauNomEpoux"
                placeholder="Nom de l'époux"
                value={this.state.nouveauNomEpoux}
                onChange={this.handleNomEpouxChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="nouveauNomEpouse" className="text-info">Nom de l'épouse</label>
              <input
                type="text"
                className="form-control"
                id="nouveauNomEpouse"
                placeholder="Nom de l'épouse"
                value={this.state.nouveauNomEpouse}
                onChange={this.handleNomEpouseChange}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={this.creerLivretFamille}
            >
              Créer Livret de Famille
            </button>
            <div className="form-group">
          <label htmlFor="nouvelleAdresseEnfant">Adresse de l'enfant</label>
          <input
            type="text"
            className="form-control"
            id="nouvelleAdresseEnfant"
            placeholder="Adresse de l'enfant"
            value={this.state.nouvelleAdresseEnfant}
            onChange={this.handleNouvelleAdresseEnfantChange}
          />
          <button
            className="btn btn-primary mt-2"
            onClick={this.handleAjouterEnfant}
          >
            Ajouter Enfant
          </button>
          <div>
  <button
    className="btn btn-danger mt-2"
    onClick={this.handleDivorce}
  >
    Divorcer
  </button>
  <button
    className="btn btn-warning mt-2 ml-2"
    onClick={this.handleDeces}
  >
    Décès 
  </button>
</div>
        </div>

          </div>
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title text-success">Informations du Livret de Famille</h5>
                <p className="card-text"><strong>Nom de l'époux :</strong> {this.state.nomEpoux}</p>
                <p className="card-text"><strong>Nom de l'épouse :</strong> {this.state.nomEpouse}</p>
                <p className="card-text"><strong>Date de mariage :</strong> {new Date(this.state.dateMariage * 1000).toLocaleDateString()}</p>
                <p className="card-text"><strong>Enfants :</strong> {this.state.enfants.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;