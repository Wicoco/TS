"use strict";
// Exercice 3 - Partie 1 : Assuré et Contrat
// Statut du client
var StatutClient;
(function (StatutClient) {
    StatutClient["Regular"] = "regular";
    StatutClient["VIP"] = "vip";
})(StatutClient || (StatutClient = {}));
// Statut du contrat
var StatutContrat;
(function (StatutContrat) {
    StatutContrat["Actif"] = "actif";
    StatutContrat["Annule"] = "annule";
})(StatutContrat || (StatutContrat = {}));
// Classe Client
class Assure {
    constructor(id, nom, email, telephone, statut = StatutClient.Regular) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
        this.statut = statut;
    }
}
// Classe Contrat
class Contrat {
    constructor(id, clientId, primeBase, statut = StatutContrat.Actif, reduction, bonus) {
        this.id = id;
        this.clientId = clientId;
        this.primeBase = primeBase;
        this.statut = statut;
        this.reduction = reduction;
        this.bonus = bonus;
    }
}
// Exercice 3 - Partie 2 : Sinistres, Experts et Paiements
// Types de sinistre
var TypeSinistre;
(function (TypeSinistre) {
    TypeSinistre["Incendie"] = "incendie";
    TypeSinistre["Vol"] = "vol";
    TypeSinistre["DegatEaux"] = "degat_eaux";
    TypeSinistre["Accident"] = "accident";
})(TypeSinistre || (TypeSinistre = {}));
// Classe Sinistre
class Sinistre {
    constructor(id, contratId, date, type, description, expertId) {
        this.id = id;
        this.contratId = contratId;
        this.date = date;
        this.type = type;
        this.description = description;
        this.expertId = expertId;
    }
}
// Classe Expert
class Expert {
    constructor(id, nom, specialites) {
        this.id = id;
        this.nom = nom;
        this.specialites = specialites;
    }
}
// Méthodes de paiement
var MethodePaiement;
(function (MethodePaiement) {
    MethodePaiement["Carte"] = "carte";
    MethodePaiement["Virement"] = "virement";
    MethodePaiement["Especes"] = "especes";
})(MethodePaiement || (MethodePaiement = {}));
// Statuts paiement
var StatutPaiement;
(function (StatutPaiement) {
    StatutPaiement["EnAttente"] = "en_attente";
    StatutPaiement["Paye"] = "paye";
    StatutPaiement["Echoue"] = "echoue";
})(StatutPaiement || (StatutPaiement = {}));
// Classe Paiement
class Paiement {
    constructor(id, contratId, montant, date, methode, statut = StatutPaiement.EnAttente) {
        this.id = id;
        this.contratId = contratId;
        this.montant = montant;
        this.date = date;
        this.methode = methode;
        this.statut = statut;
    }
}
// Exercice 3 - Partie 3 : Options et Système global
// Options contractuelles
class OptionContrat {
    constructor(id, nom, description, coutSupplementaire) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.coutSupplementaire = coutSupplementaire;
    }
}
class ContratAvecOptions {
    constructor(id, clientId, primeBase, actif, options = []) {
        this.id = id;
        this.clientId = clientId;
        this.primeBase = primeBase;
        this.actif = actif;
        this.options = options;
    }
}
// Journal des événements
var ActionEvenement;
(function (ActionEvenement) {
    ActionEvenement["ContratCree"] = "contrat_cree";
    ActionEvenement["SinistreAjoute"] = "sinistre_ajoute";
    ActionEvenement["PaiementReussi"] = "paiement_reussi";
    ActionEvenement["PaiementEchoue"] = "paiement_echoue";
    ActionEvenement["ContratTermine"] = "contrat_termine";
})(ActionEvenement || (ActionEvenement = {}));
var TypeEntite;
(function (TypeEntite) {
    TypeEntite["Client"] = "client";
    TypeEntite["Contrat"] = "contrat";
    TypeEntite["Sinistre"] = "sinistre";
    TypeEntite["Paiement"] = "paiement";
})(TypeEntite || (TypeEntite = {}));
class JournalEvenement {
    constructor(id, date, action, entite, entiteId) {
        this.id = id;
        this.date = date;
        this.action = action;
        this.entite = entite;
        this.entiteId = entiteId;
    }
}
// Système global
class SystemeAssurance {
    constructor() {
        this.clients = [];
        this.contrats = [];
        this.sinistres = [];
        this.paiements = [];
        this.experts = [];
        this.evenements = [];
    }
    // Lister tous les contrats actifs d’un client
    contratsActifs(clientId) {
        return this.contrats.filter((c) => c.clientId === clientId && c.actif);
    }
    // Lister les sinistres en cours d’un client
    sinistresClient(clientId) {
        return this.sinistres.filter((s) => this.contrats.some((c) => c.id === s.contratId && c.clientId === clientId));
    }
    // Historique des paiements d’un client
    paiementsClient(clientId) {
        return this.paiements.filter((p) => this.contrats.some((c) => c.id === p.contratId && c.clientId === clientId));
    }
}
// Exercice 3 - Partie 4 : Bénéficiaires et Procédures
// Bénéficiaires et ayants droit
var LienBeneficiaire;
(function (LienBeneficiaire) {
    LienBeneficiaire["Conjoint"] = "conjoint";
    LienBeneficiaire["Enfant"] = "enfant";
    LienBeneficiaire["Societe"] = "societe";
    LienBeneficiaire["Autre"] = "autre";
})(LienBeneficiaire || (LienBeneficiaire = {}));
class Beneficiaire {
    constructor(id, nom, lien, part // en pourcentage
    ) {
        this.id = id;
        this.nom = nom;
        this.lien = lien;
        this.part = part;
    }
}
// Contrat avec bénéficiaires
class ContratAvecBeneficiaires extends ContratAvecOptions {
    constructor() {
        super(...arguments);
        this.beneficiaires = [];
    }
    ajouterBeneficiaire(beneficiaire) {
        this.beneficiaires.push(beneficiaire);
    }
}
// Recours et procédures
var StatutProcedure;
(function (StatutProcedure) {
    StatutProcedure["EnCours"] = "en_cours";
    StatutProcedure["Regle"] = "regle";
    StatutProcedure["Annule"] = "annule";
})(StatutProcedure || (StatutProcedure = {}));
class Procedure {
    constructor(id, dateOuverture, statut = StatutProcedure.EnCours, sinistreIds = [], avocatId) {
        this.id = id;
        this.dateOuverture = dateOuverture;
        this.statut = statut;
        this.sinistreIds = sinistreIds;
        this.avocatId = avocatId;
    }
}
// Classe Avocat
class Avocat {
    constructor(id, nom, procedureIds = []) {
        this.id = id;
        this.nom = nom;
        this.procedureIds = procedureIds;
    }
    assignerProcedure(proc) {
        this.procedureIds.push(proc.id);
        proc.avocatId = this.id;
    }
}
