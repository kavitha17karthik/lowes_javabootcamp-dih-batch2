class Counter{
     static int count=0;
    public Counter()
    {
        count++;
        System.out.println("counter value is"+count);
    }
}


public class ConstrutorCalling {
    public static void main(String[] args) {
        /*whenever an object is created constructor is called and each time a new object is created
        constructor is called by initializing the variables value mentioned in the class.

        If count is declared without static keyword this program prints 1 as a output all the time
        when the constructor is created.

        when we use static keyword for count variable the incremented value is retained and this program will
        print 1 2 3 as an output.
         */
        Counter c1=new Counter();
        Counter c2=new Counter();
        Counter c3=new Counter();

    }
}
