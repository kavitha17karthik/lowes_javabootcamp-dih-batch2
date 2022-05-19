package day6;

class BankDetails{
    public String name;
    private int accountnumber;
    private int balance=0;

    public BankDetails(int accountnumber)
    {
        this.accountnumber = accountnumber;
    }

    public int getBalance(){
        return balance;
    }
    public int getAccountNumber(){
        return accountnumber;

    }
}
public class BankInfo {
    public static void main(String[] args) {
        BankDetails bkInfo = new BankDetails(12345);
        System.out.println(bkInfo.getAccountNumber());
        System.out.println(bkInfo.getBalance());
    }
}
