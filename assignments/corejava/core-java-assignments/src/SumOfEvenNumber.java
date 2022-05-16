import java.util.Scanner;
public class SumOfEvenNumber {

    private static Scanner sc;
    public static void main(String[] args) {
        int number,count,sumeven_no=0;
        sc = new Scanner(System.in);
        System.out.println("Enter any Number(other than zero)\n");
        number=sc.nextInt();
        for(count=1;count<=number;count++){
            if(count%2==0)  //check number is even or not
            {
                sumeven_no+=count;  //if the entered number is even add it
            }
        }
        System.out.println("The sum of even numbers upto "+number +" is "+sumeven_no);

    }

}
