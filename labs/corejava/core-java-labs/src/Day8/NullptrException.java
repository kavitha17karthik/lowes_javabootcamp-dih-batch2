package Day8;

class Customer{
    public void display(){
        System.out.println("displaying...");
    }
}

public class NullptrException {

        public static void main(String[] args) {
        /*    String str = "kavitha";
            String str1= "";
            String str2=null;

            try{
                System.out.println(str.length());

            }catch (NullPointerException ex){
                System.out.println(ex.getMessage());
            }
           try{
                System.out.println(str1.length());

           }catch (NullPointerException ex){
                System.out.println(ex.getMessage());
           }
            try{
                System.out.println(str2.length());

            }catch (NullPointerException ex){
                System.out.println(ex.getMessage());
            }*/

            Customer customer = new Customer();
            customer.display();

            Customer customer1 = null;
            try{
                customer1.display();
            }catch (NullPointerException ex)
            {
               // System.out.println(ex.getStackTrace());
              System.out.println(ex.getLocalizedMessage());

            }

        }

 }
