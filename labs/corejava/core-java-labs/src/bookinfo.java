class Book_details{
    public String title;
    public String creator;
    public int price;

    public Book_details(String title, String creator, int price)
    {
        this.title = title;
        this.creator = creator;
        this.price=price;
    }
    public void display(){
        System.out.println("The book " +title +" is Written by the author "+" "+ creator+" and is priced at Rs."+  price );
    }
}
public class bookinfo {
    public static void main(String[] args) {
        Book_details book1 = new Book_details("2 States","Chetan Bhagath",800);
        book1.display();
        Book_details book2 = new Book_details("Hamlet","William Shakespeare ",1800);
        book2.display();

      /*book1.creator = "Chetan Bhagath";
        book1.title=" 2 States";
        book1.price=800;

        Book_details book2 = new Book_details();
        book2.creator = "William Shakespeare";
        book2.title=" Hamlet ";
        book2.price=1800;
        book1.display();
        book2.display();*/
    }
}
