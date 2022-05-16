import java.util.Scanner;
public class TenTableReverse {
    public static void main(String[] args) {
        int number=10,i;
        System.out.println("Creating 10 Table in reverse order");
        for(i=10;i>0;i--){
            System.out.println(number+ " * " + i + "="+ (number*i));
        }
    }
}
