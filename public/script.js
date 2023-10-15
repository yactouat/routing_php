$(document).ready(function() {
    // Chargez les catégories dès que la page est prête
    fetchCategories();

    // Écouteur d'événement pour générer le graphique
    $("#generateGraphBtn").on('click', generateGraph);

    function fetchCategories() {
        $.ajax({
            url: 'get_categories.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var dropdown = $("#categorieDropdown");
                dropdown.empty();  // Vider les options existantes
                
                data.categories.forEach(function(cat) {
                    dropdown.append(new Option(cat, cat));
                });
            },
            error: function(err) {
                console.error("Erreur AJAX", err); // pour le débogage
                displayNotification("Erreur lors du chargement des catégories.");
            }
        });
    }

    function generateGraph() {

        var selectedCategorie = $("#categorieDropdown").val();
        var selectedType = $("#typeSelection").val();

        if (!selectedCategorie || !selectedType) {
            displayNotification("Veuillez sélectionner une catégorie et un type avant de générer le graphique.");
            return;
        }

        $.ajax({
            url: 'generate_graph.php',
            method: 'GET',
            data: {
                'categorie': selectedCategorie,
                'type': selectedType
            },
            dataType: 'json',
            success: function(data) {
                if (data && data.status === "success") {
                    var imageName = selectedType === "categorie" ? "output_category_graph.png" : "output_panier_moyen_graph.png";
                    // Mettez à jour la source de l'image avec le chemin du graphique généré
                    $("#graphImage").attr("src", imageName + "?" + new Date().getTime()); // Ajout d'un timestamp pour forcer le rechargement de l'image
                } else {
                    displayNotification("Erreur lors de la génération du graphique.");
                }
            },
            error: function() {
                displayNotification("Erreur lors de la demande de génération du graphique.");
            }
        });
    }

    // Cette fonction est un exemple de remplacement des alertes par une notification moins intrusive.
    function displayNotification(message) {
        // Par exemple, vous pourriez avoir un div pour les notifications dans votre HTML.
        // Pour ce code, je vais utiliser une alerte, mais vous pouvez le remplacer par votre propre implémentation.
        alert(message);
    }
});








