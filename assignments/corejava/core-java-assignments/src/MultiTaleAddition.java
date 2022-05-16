import java.util.Scanner;
public class MultiTaleAddition {
    private static Scanner sc;

    public static void main(String[] args) {
        int number,i,sum=0;
        sc = new Scanner(System.in);
        System.out.println("mEnter a number for which you want to create a multiplication table\n");
        number=sc.nextInt();
        for(i=0;i<=10;i++){
            System.out.println(number+ " * " + i + "="+ (number*i));
            sum=sum+(number*i);
        }
        System.out.println("sum of the numbers occurring in the multiplication table of number is"+sum);
    }

}
