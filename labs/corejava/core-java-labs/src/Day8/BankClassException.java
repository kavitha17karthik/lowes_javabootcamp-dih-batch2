package Day8;
import java.net.SocketOption;
import java.util.Scanner;

class InsufficientFundException extends Exception{
    public InsufficientFundException(String msg)
    {
        System.out.println(msg);
    }
}
class Bank
{
    public static int bal=0;
    public void Deposit(int amount){
        bal = amount;
        System.out.println("You have deposited "+amount);
    }
    public void withdraw(int amount){
        System.out.println("\ninside withdraw function");
        try{
            System.out.println("Current Balance" + bal);
            System.out.println("You are trying to withdraw"+amount);
            if(amount>bal) {
                throw new InsufficientFundException("Insufficient Fund/Balance...You are trying to withdraw an amount(which is more than your balance)..");
            }
            else
                System.out.println("You have withdrawn " + amount);
        } catch(InsufficientFundException ex){
            System.out.println(ex.getMessage());
        }
    }
}
public class BankClassException {
    public static void main(String[] args) {
        System.out.println();
        Bank info = new Bank();
        System.out.println("\nDepositing...");

        info.Deposit(10000);
        System.out.println("\nEnter how much do you want to withdraw....");
        Scanner sc=new Scanner(System.in);
        int withdrawAmount = sc.nextInt();
        info.withdraw(withdrawAmount);
    }
}
