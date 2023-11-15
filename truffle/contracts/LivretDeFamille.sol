// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LivretDeFamille {
    address public owner;
    string public nomEpoux;
    string public nomEpouse;
    uint256 public dateMariage;
    address[] public enfants;
    mapping(address => bool) public estEnfant;
    event EnfantAjoute(address enfant);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyMarried() {
        require(bytes(nomEpoux).length > 0 && bytes(nomEpouse).length > 0);
        _;
    }

    constructor(string memory _nomEpoux, string memory _nomEpouse , uint256 _dateMariage) {
        owner = msg.sender;
        nomEpoux = _nomEpoux;
        nomEpouse = _nomEpouse;
        dateMariage = _dateMariage;
    }

    function creerLivretFamille(string memory _nomEpoux, string memory _nomEpouse, uint256 _dateMariage) public onlyOwner {
        nomEpoux = _nomEpoux;
        nomEpouse = _nomEpouse;
        dateMariage = _dateMariage;
    }

    function ajouterEnfant(address _adresseEnfant) public onlyOwner onlyMarried {
        enfants.push(_adresseEnfant);
        estEnfant[_adresseEnfant] = true;
        emit EnfantAjoute(_adresseEnfant);
    }

    function divorcer() public onlyOwner {
        nomEpoux = "";
        nomEpouse = "";
        dateMariage = 0;
    }

    function deces() public onlyOwner {
        if (msg.sender == owner) {
            nomEpoux = "";
        } else {
            nomEpouse = "";
        }
    }

    function obtenirInformations() public view returns (string memory, string memory, uint256, address[] memory) {
        return (nomEpoux, nomEpouse, dateMariage, enfants);
    }
}