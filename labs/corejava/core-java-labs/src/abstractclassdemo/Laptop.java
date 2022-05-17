package abstractclassdemo;

class Laptop_Info{
    static int laptop_count=0;
    String model;
    String manufacturer;
    String color;

    public Laptop_Info()
    {

    }
    public Laptop_Info(String model,String manufacturer,String color){
        this.manufacturer=manufacturer;
        this.model=model;
        this.color=color;
        laptop_count++;
    }

    public void displayLaptopInfo(){
        System.out.println("maker"+manufacturer);
        System.out.println("model "+model);
        System.out.println("color "+ color);
        System.out.println("Laptop Count "+laptop_count);
    }

}

public class Laptop {
    public static void main(String[] args) {
        Laptop_Info laptop1=new Laptop_Info("abc","HP","black");
        laptop1.displayLaptopInfo();
        Laptop_Info laptop2=new Laptop_Info("abc","DELL","gold");
        laptop2.displayLaptopInfo();

    }

}
