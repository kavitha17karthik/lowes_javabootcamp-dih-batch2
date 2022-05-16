class Car
{
    public String Name;
    public String brand;
    public String color;
    public int price;
    public  Car(Car car)
    {
        this.brand = car.brand;
        this.Name = car.Name;
        this.color = car.color;
        this.price=car.price;

    }
    public  Car(Car car,int price)
    {
        this.brand = car.brand;
        this.Name = car.Name;
        this.color = car.color;
        this.price=price;
    }
    public  Car(String name, String brand, String color, int price)
    {
        this.brand = brand;
        this.Name = name;
        this.color = color;
        this.price = price;

    }
public void display()
{
    System.out.println("Car details");
    System.out.println("Brand is:"+this.brand);
    System.out.println("Color of the car is: "+this.color);
    System.out.println("Price is "+this.price);

}
}
public class Constructor {
    public static void main(String[] args) {

        Car car1 = new Car("A10","BMW","Black",100000);
        car1.display();

        Car car2 = new Car(car1);
        car2.display();

        Car car3 = new Car(car1,4000000);
        car3.display();


    }
}
