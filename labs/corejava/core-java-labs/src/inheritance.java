class Bank{
    public int getROI(){
        return 1;
    }
}
class BankA extends Bank{
    public int getROI(){
        return 2;
    }
}
class BankB extends Bank{
    public int getROI()
    {
        return 3;
    }
}
public class inheritance {
    public static void main(String[] args) {
    BankA bankA=new BankA();
    BankB bankB=new BankB();
        System.out.println(bankA.getROI());
        System.out.println(bankB.getROI());
    }
}

/*this program display 2 and 3 as output
* when we created a class and we extended it from parent class and if we
* call a member function of a child class then only the child class function
* will be called,*/

