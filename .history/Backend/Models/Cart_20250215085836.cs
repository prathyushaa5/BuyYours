public class Cart
{
    public int CartID { get; set; }
    public int UserID { get; set; }
    public DateTime CreatedDate { get; set; }

    // Navigation property
    public List<CartItem> CartItems { get; set; }
}
