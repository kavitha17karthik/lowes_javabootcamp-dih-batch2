package OptionalDemo;

import java.util.Arrays;
import java.util.List;
import java.util.List.*;
import java.util.Optional;

public class OptionalMethod {
    public static void main(String[] args) {

       // getCity().orElseThrow(RuntimeException::new);
     //   List<String> cities = getCity().isPresent()? getCity().get(): getCities().subList(0, 2);
         getCity().ifPresentOrElse(System.out::println, null);
        Optional<List<String>> filCity=getCity().filter(item->item.contains("mumbai")||item.contains("kerala"));
        System.out.println(filCity);

     //   if (cities != null) {
     //       System.out.println(cities.get(2));
     //   }
      //  String newcity = getCity().isPresent() ? getCity().get() : getCity().orElse("Kerala");
       // System.out.println(newcity);
    }
    private static List<String> getCities(){
      return Arrays.asList("Chennai","blr","Mumbai");
        //return null;
    }
    private static Optional<List<String>> getCity() {
       Optional<List<String>> cities = Optional.of(Arrays.asList("Bangalore","mumbai","kerala"));
        return cities;
        //return null;
    }
   /* public static Optional<String> getCity(){
        Optional city= Optional.of("Mangalore");
       // Optional city= Optional.ofNullable(null);
        return city;
        //return "delhi";
        }*/
    public static void Throw()
    {
        System.out.println("Cities not Found");
    }
}
