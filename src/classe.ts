// Exercice 3 - Part 1 : Assuré et Contrat

// Statut du client
enum StatutClient {
  Regular = "regular",
  VIP = "vip",
}

// Statut du contrat
enum StatutContrat {
  Actif = "actif",
  Annule = "annule",
}

// Classe Client
class Assure {
  constructor(
    public id: number,
    public nom: string,
    public email: string,
    public telephone?: string,
    public statut: StatutClient = StatutClient.Regular
  ) {}
}

// Classe Contrat
class Contrat {
  constructor(
    public id: number,
    public clientId: number,
    public primeBase: number,
    public statut: StatutContrat = StatutContrat.Actif,
    public reduction?: number,
    public bonus?: number
  ) {}
}

// Exercice 3 - Part 2 : Sinistres, Experts et Paiements

// Types de sinistre
enum TypeSinistre {
  Incendie = "incendie",
  Vol = "vol",
  DegatEaux = "degat_eaux",
  Accident = "accident",
}

// Classe Sinistre
class Sinistre {
  constructor(
    public id: number,
    public contratId: number,
    public date: string,
    public type: TypeSinistre,
    public description?: string,
    public expertId?: number
  ) {}
}

// Classe Expert
class Expert {
  constructor(
    public id: number,
    public nom: string,
    public specialites: TypeSinistre[]
  ) {}
}

// Méthodes de paiement
enum MethodePaiement {
  Carte = "carte",
  Virement = "virement",
  Especes = "especes",
}

// Statuts paiement
enum StatutPaiement {
  EnAttente = "en_attente",
  Paye = "paye",
  Echoue = "echoue",
}

// Classe Paiement
class Paiement {
  constructor(
    public id: number,
    public contratId: number,
    public montant: number,
    public date: string,
    public methode: MethodePaiement,
    public statut: StatutPaiement = StatutPaiement.EnAttente
  ) {}
}

// Exercice 3 - Part 3 : Options et Système global

// Options contractuelles
class OptionContrat {
  constructor(
    public id: number,
    public nom: string,
    public description: string,
    public coutSupplementaire: number
  ) {}
}

class ContratAvecOptions {
  constructor(
    public id: number,
    public clientId: number,
    public primeBase: number,
    public actif: boolean,
    public options: OptionContrat[] = []
  ) {}
}

// Journal des événements
enum ActionEvenement {
  ContratCree = "contrat_cree",
  SinistreAjoute = "sinistre_ajoute",
  PaiementReussi = "paiement_reussi",
  PaiementEchoue = "paiement_echoue",
  ContratTermine = "contrat_termine",
}

enum TypeEntite {
  Client = "client",
  Contrat = "contrat",
  Sinistre = "sinistre",
  Paiement = "paiement",
}

class JournalEvenement {
  constructor(
    public id: number,
    public date: string,
    public action: ActionEvenement,
    public entite: TypeEntite,
    public entiteId: number
  ) {}
}

// Système global
class SystemeAssurance {
  clients: Assure[] = [];
  contrats: ContratAvecOptions[] = [];
  sinistres: Sinistre[] = [];
  paiements: Paiement[] = [];
  experts: Expert[] = [];
  evenements: JournalEvenement[] = [];

  // Lister tous les contrats actifs d’un client
  contratsActifs(clientId: number): ContratAvecOptions[] {
    return this.contrats.filter((c) => c.clientId === clientId && c.actif);
  }

  // Lister les sinistres en cours d’un client
  sinistresClient(clientId: number): Sinistre[] {
    return this.sinistres.filter((s) =>
      this.contrats.some((c) => c.id === s.contratId && c.clientId === clientId)
    );
  }

  // Historique des paiements d’un client
  paiementsClient(clientId: number): Paiement[] {
    return this.paiements.filter((p) =>
      this.contrats.some((c) => c.id === p.contratId && c.clientId === clientId)
    );
  }
}

// Exercice 3 - Part 4 : Bénéficiaires et Procédures

// Bénéficiaires et ayants droit
enum LienBeneficiaire {
  Conjoint = "conjoint",
  Enfant = "enfant",
  Societe = "societe",
  Autre = "autre",
}

class Beneficiaire {
  constructor(
    public id: number,
    public nom: string,
    public lien: LienBeneficiaire,
    public part: number
  ) {}
}

// Contrat avec bénéficiaires
class ContratAvecBeneficiaires extends ContratAvecOptions {
  public beneficiaires: Beneficiaire[] = [];

  ajouterBeneficiaire(beneficiaire: Beneficiaire) {
    this.beneficiaires.push(beneficiaire);
  }
}

// Recours et procédures
enum StatutProcedure {
  EnCours = "en_cours",
  Regle = "regle",
  Annule = "annule",
}

class Procedure {
  constructor(
    public id: number,
    public dateOuverture: string,
    public statut: StatutProcedure = StatutProcedure.EnCours,
    public sinistreIds: number[] = [],
    public avocatId?: number
  ) {}
}

// Classe Avocat
class Avocat {
  constructor(
    public id: number,
    public nom: string,
    public procedureIds: number[] = []
  ) {}

  assignerProcedure(proc: Procedure) {
    this.procedureIds.push(proc.id);
    proc.avocatId = this.id;
  }
}

// Exercice 3 - Part 5 : Remboursements et Audits

// H. Les remboursements

enum MethodeVersement {
  Virement = "virement",
  Cheque = "cheque",
  Especes = "especes",
}

// Versement individuel
class Versement {
  constructor(
    public id: number,
    public montant: number,
    public date: string,
    public methode: MethodeVersement
  ) {}
}

class Remboursement {
  public versements: Versement[] = [];

  constructor(
    public id: number,
    public sinistreId: number,
    public montantTotal: number
  ) {}

  // Ajouter un versement
  ajouterVersement(versement: Versement) {
    this.versements.push(versement);
  }

  // Vérifier si le remboursement est complet
  estComplet(): boolean {
    const totalVerse = this.versements.reduce(
      (somme, v) => somme + v.montant,
      0
    );
    return totalVerse >= this.montantTotal;
  }
}

// I. Audits et contrôles internes

enum TypeAnomalie {
  Contrat = "contrat",
  Paiement = "paiement",
  Sinistre = "sinistre",
}

enum StatutAnomalie {
  Ouverte = "ouverte",
  EnCours = "en_cours",
  Resolue = "resolue",
}

class Anomalie {
  constructor(
    public id: number,
    public type: TypeAnomalie,
    public entiteId: number,
    public description: string,
    public statut: StatutAnomalie = StatutAnomalie.Ouverte
  ) {}
}

class Audit {
  public anomalies: Anomalie[] = [];

  constructor(
    public id: number,
    public periodeDebut: string,
    public periodeFin: string,
    public rapport: string
  ) {}

  ajouterAnomalie(anomalie: Anomalie) {
    this.anomalies.push(anomalie);
  }

  anomaliesOuvertes(): Anomalie[] {
    return this.anomalies.filter(a => a.statut !== StatutAnomalie.Resolue);
  }
}

// Exercice 3 - Partie 6 : Réassurance et mutualisation

// Contrat de réassurance
class ContratReassurance {
  constructor(
    public id: number,
    public compagniePartenaire: string,
    public periodeDebut: string,
    public periodeFin: string,
    public pourcentageCouv: number
  ) {}

  estValide(date: string): boolean {
    return date >= this.periodeDebut && date <= this.periodeFin;
  }
}

// Contrat d’assurance avec réassureurs
class ContratAvecReassurance extends ContratAvecBeneficiaires {
  public reassurances: ContratReassurance[] = [];

  ajouterReassurance(reassurance: ContratReassurance) {
    this.reassurances.push(reassurance);
  }

  // Calcul des parts de remboursement pour un sinistre donné
  calculerPartReassureurs(sinistre: Sinistre, montant: number): { compagnie: string; part: number }[] {
    const actifs = this.reassurances.filter(r => r.estValide(sinistre.date));
    return actifs.map(r => ({
      compagnie: r.compagniePartenaire,
      part: (montant * r.pourcentageCouv) / 100,
    }));
  }
}

// Part 7 : Système complet
// Enums

enum PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED
}

enum Country {
    FRANCE,
    GERMANY,
    ITALY,
    SPAIN
}

// Interfaces

interface ContactInfo {
    String getEmail();
    String getPhoneNumber();
}

interface Option {
    String getName();
    double getPrice();
}

// Classes
class Person implements ContactInfo {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Country country;

    public Person(String firstName, String lastName, String email, String phoneNumber, Country country) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
    }

    // Implémentation interface ContactInfo
    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public String getPhoneNumber() {
        return phoneNumber;
    }

    // Getters / setters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Country getCountry() { return country; }
}

class Payment {
    private double amount;
    private PaymentStatus status;

    public Payment(double amount) {
        this.amount = amount;
        this.status = PaymentStatus.PENDING;
    }

    // Méthodes
    public void processPayment() {
        // logique de paiement
        this.status = PaymentStatus.COMPLETED;
    }

    public PaymentStatus getStatus() { return status; }
    public double getAmount() { return amount; }
}

class Contract {
    private String contractId;
    private Person customer;
    private List<Payment> payments;
    private List<Option> options;

    public Contract(String contractId, Person customer) {
        this.contractId = contractId;
        this.customer = customer;
        this.payments = new ArrayList<>();
        this.options = new ArrayList<>();
    }

    // Méthodes
    public void addPayment(Payment payment) {
        payments.add(payment);
    }

    public void addOption(Option option) {
        options.add(option);
    }

    public double getTotalPaid() {
        return payments.stream()
                .filter(p -> p.getStatus() == PaymentStatus.COMPLETED)
                .mapToDouble(Payment::getAmount)
                .sum();
    }

    // Getters
    public String getContractId() { return contractId; }
    public Person getCustomer() { return customer; }
}

class Claim {
    private String claimId;
    private Contract relatedContract;
    private Expert expert;

    public Claim(String claimId, Contract relatedContract, Expert expert) {
        this.claimId = claimId;
        this.relatedContract = relatedContract;
        this.expert = expert;
    }

    // Méthodes
    public void evaluateClaim() {
    }

    // Getters
    public Expert getExpert() { return expert; }
    public String getClaimId() { return claimId; }
}
class Expert extends Person {
    private String specialty;

    public Expert(String firstName, String lastName, String email, String phoneNumber, Country country, String specialty) {
        super(firstName, lastName, email, phoneNumber, country);
        this.specialty = specialty;
    }

    // Méthodes
    public void analyzeClaim(Claim claim) {
    }

    public string getSpecialty() { return specialty; }
}