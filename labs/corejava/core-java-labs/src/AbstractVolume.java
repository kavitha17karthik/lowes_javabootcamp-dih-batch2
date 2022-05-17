abstract class Shapes // abstract class for which we cannot create a instance or object
    {
        public double height;
        public double radius;
        public final float pie=3.14f;
        public abstract void getVolume(); // abstract function which should be implemented only in the extended class

    }

class SemiCircle extends Shapes {
    public SemiCircle(double height,double radius)
    {
        this.height = height;
        this.radius=radius;
    }
    @Override
    public void getVolume() {
        System.out.println("finding volume of SC");
        System.out.println("radius="+ radius);
        System.out.println("radius="+ height);
        System.out.println("pie = " + (this.pie));
        System.out.println("Volume of SemiCircle is :" + ((0.5)*(this.pie)*radius*radius*height));
    }
}

class Cone extends Shapes {
    public Cone(double height,double radius){
        this.height = height;
        this.radius= radius;
    }
    @Override
    public void getVolume() {
        System.out.println("finding volume of Cone");
        System.out.println("radius="+ radius);
        System.out.println("radius="+ height);
        System.out.println("pie = " +pie);
        System.out.println("Volume of Cone is :" + ((0.33)*(pie)*radius*radius*height));
    }

}
public class AbstractVolume {
    public static void main(String[] args) {
        SemiCircle cir = new SemiCircle(10.13,5.2);
        Cone cone = new Cone(5.5,8.3);//1/3pie r 2 h
        cir.getVolume();
        cone.getVolume();
    }

}
