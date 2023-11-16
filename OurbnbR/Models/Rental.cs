using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Ourbnb.Models
{
    public class Rental
    {
        [JsonPropertyName("RentalId")]
        public int RentalId { get; set; }

        [JsonPropertyName("Name")]
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ\s]{2,50}", ErrorMessage = "Name must be letters or numbers between 2 to 50 charachters")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("Description")]
        [StringLength(200)]
        public string? Description { get; set; }

        [JsonPropertyName("FromDate")]
        public DateTime FromDate { get; set; }

        [JsonPropertyName("ToDate")]
        public DateTime ToDate { get; set; }

        [JsonPropertyName("Rating")]
        [Range(0.01, 5, ErrorMessage ="Rating must be greater than 0 and 5 or less")]
        public double? Rating { get; set; } = default!;

        [JsonPropertyName("Location")]
        [RegularExpression(@"[0-9a-zA-ZæøåÆØÅ ]{2,50}", ErrorMessage = "Name must be letters or numbers between 2 to 50 charachters")]
        public string Location { get; set; } = string.Empty;

        [JsonPropertyName("Price")]
        [Range(0.01, int.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public int Price { get; set; }

        [JsonPropertyName("Image")]
        public string? Image { get; set; }

        [JsonPropertyName("OwnerId")]
        [Display(Name = "Owners")]
        public int OwnerId { get; set; }

        [JsonPropertyName("Owner")]
        public virtual Customer Owner { get; set; } = default!;

        [JsonPropertyName("Orders")]
        public virtual List<Order>? Orders { get; set; }

        // will find the avg of the rating when a rental has been given a rating in order
        //internal void UpdateRating()
        //{
        //    if(Orders == null || Orders.Count == 0)
        //    {
        //        Rating = 0; return;
        //    }

        //    double rating = 0;
        //    foreach (var o in Orders)
        //    {
        //        if (o.Rating != null)
        //        {
        //            rating += (int)o.Rating;
        //        }
        //    }
        //    Rating = Math.Round(rating / Orders.Count, 2);

        //}
    }
}
