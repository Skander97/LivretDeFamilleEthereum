const LivretDeFamille = artifacts.require("LivretDeFamille");

module.exports = function (deployer) {
  const nomEpoux = "Nom de l'époux"; 
  const nomEpouse = "Nom de l'épouse"; 
  const dateMariage = Math.floor(Date.now() / 1000);
  deployer.deploy(LivretDeFamille, nomEpoux, nomEpouse, dateMariage);
};
