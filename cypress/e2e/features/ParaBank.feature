# language: fr
Fonctionnalité: ParaBank - parcours E2E complet connecté

  Scénario: Parcours complet utilisateur sur ParaBank
    Étant donné je suis sur la page d'accueil ParaBank

    Quand je clique sur Register
    Et je remplis le formulaire Register
    Et je soumets le formulaire Register
    Alors le compte ParaBank est créé


Quand je vais sur Accounts Overview
Alors le tableau Accounts Overview est affiché

Quand je clique sur le premier numéro de compte
Alors la page Account Details est affichée

    
    Quand je vais sur Accounts Overview
    Alors le tableau Accounts Overview est affiché

    Quand je vais sur Transfer Funds
    Et je transfère "50"
    Alors le transfert est effectué

    Quand je vais sur Bill Pay
    Et je remplis le formulaire Bill Pay
    Et je soumets le paiement
    Alors le paiement est effectué

    Quand je vais sur Update Contact Info
    Et je mets à jour le First Name
    Et je soumets la mise à jour du profil
    Alors le profil est mis à jour

    Quand je vais sur Request Loan
    Et je remplis le formulaire de prêt
    Et je soumets la demande de prêt
    Alors le statut du prêt est affiché

    Quand je vais sur About Us
    Alors la page About Us est affichée

    Quand je vais sur Services
    Alors la page Services est affichée

    Quand je vais sur Products
    Alors la page Products externe est affichée

    Quand je vais sur Locations
    Alors la page Locations externe est affichée

    Quand je vais sur Admin Page
    Alors la page Admin est affichée

    Quand je clique sur l’icône home
    Alors la page index est affichée

    Quand je clique sur l’icône about
    Alors la page about est affichée

    Quand je clique sur l’icône contact
    Alors la page contact est affichée
    Quand je remplis le formulaire Customer Care
    Et j’envoie le message Customer Care
    Alors le message de remerciement est affiché

    Quand je me déconnecte de ParaBank
    Alors je suis déconnecté de ParaBank