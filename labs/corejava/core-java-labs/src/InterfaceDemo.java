//we cannot create a object for an interface
interface CheckInterface{
    void display();
    default void printing(){
        System.out.println("print....");
    }
}

//class inherited by interface...
class Demo implements CheckInterface{

    public void display()
    {
        System.out.println("Inside Demo class...\n");
    }

}

public class InterfaceDemo {
    public static void main(String[] args) {
        Demo dem = new Demo();
        dem.printing();
        dem.display();

    }
}
