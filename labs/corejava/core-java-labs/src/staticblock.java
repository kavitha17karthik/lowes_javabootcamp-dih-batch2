import javax.swing.*;

public class staticblock {
     static
    {
        System.out.printf("inside static check\n");
    }
    public static void main(String[] args) {
        System.out.printf("inside main");
    }
}
