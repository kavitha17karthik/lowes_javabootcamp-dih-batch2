
class EmployeeDetails {
    public String fName;
    public String lName;
    public int empId;
    public String eMail;
    public void getName() {
        System.out.println(fName+""+lName);
    }
}
class FullTimeEmployee extends EmployeeDetails {
    public int salary;
}
class PartTimeEmployee extends EmployeeDetails {
    public int salary;
}
public class employee {

    public static void main(String[] args) {
        FullTimeEmployee fEmp = new FullTimeEmployee();
        PartTimeEmployee  pEmp=new PartTimeEmployee();

        fEmp.fName ="Kavitha";
        fEmp.lName = "Subramaniyan";
        pEmp.fName ="rajesh";
        pEmp.lName="ramanan";

        fEmp.getName();
        pEmp.getName();
    }
}

