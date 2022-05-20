package Day8;
class UserLoggedinAlreadyException extends Exception{


}
class Authentication{

    static boolean isLoggedIn=false;

    public  void login(String email,String passwd) throws UserLoggedinAlreadyException, NullPointerException{

        if(!isLoggedIn){
            if(email.equals("kavitha17rajesh@gmail.com") && (passwd.equals("123")))
            {
                isLoggedIn = true;
                System.out.println("you have logged in Successfully\n");
            }else {
                System.out.println("Logged in Failed , Try again");
            }

            }else {
            throw new UserLoggedinAlreadyException();

        }
    }
}
public class LoginAuthentication {
    public static void main(String[] args) {
        Authentication auth=new Authentication();
        try
        {
            auth.login("kavitha17@gmail.com","123");

        }catch(UserLoggedinAlreadyException ex){
            System.out.println(ex.getMessage());
        }

        try{
            auth.login("kavitha17rajesh@gmail.com","123");
        }catch(UserLoggedinAlreadyException ex){
            System.out.println(ex.getStackTrace());
        }
        try{
            auth.login("kavitha17rajesh@gmail.com","123");
        }catch(UserLoggedinAlreadyException ex){
            System.out.println("you already logged in");
        }

    }
}

