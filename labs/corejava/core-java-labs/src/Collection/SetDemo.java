package Collection;
import java.util.HashSet;
import java.util.TreeSet;

public class SetDemo {
    public static void main(String[] args) {
        HashSet<String> names= new HashSet<>();
        names.add("kavitha");
        names.add("sudha");
        names.add(null);
        names.add("RAJESH");
        names.add(null);
        names.add("kavitha");
        names.add("");
        names.add("arunkarthik");
        names.add("kavitha");

        for(String item:names)
        {
            System.out.println(item);
        }

        TreeSet<String> treeNames= new TreeSet<>();
        treeNames.add("kavitha");
        treeNames.add("sudha");
        treeNames.add("RAJESH");
        treeNames.add("kavitha");
        treeNames.add("arunkarthik");
        treeNames.add("kavitha");
     //   treeNames.add(null);
     //   treeNames.add(null);
      //  treeNames.add("");

        for(String item:treeNames)
        {
            System.out.println(item);
        }
        Set<Employee> employee= new HashSet<>();
        Employee emp1= new Employee();
        employee.add(emp1);


    }
}
