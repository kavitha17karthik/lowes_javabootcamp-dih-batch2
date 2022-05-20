package Day8;

public class TryCatch {
    public static void main(String[] args) {
        int a=10;
        int b=0;
        int c;
        try{
            c=a/b;
            System.out.println("C value is"+c);
        }catch(ArithmeticException arthExcep)
        {
            System.out.println();
            System.out.println(arthExcep.getMessage());
            System.out.println(arthExcep.fillInStackTrace());
            System.out.println();
        }

    }
}
