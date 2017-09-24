
public class Q1 { 
	public static void main(String[]args){
		String s = "gOod";
		String t = "odgO";
		System.out.println(sortByStrings(s,t));
	}
	
	public static int lowerOrUpper(char x){
		int index;
		if((int)x > 96 ){
			index = (int)x - 97 + 26;
		}else{
			index = (int)x - 65;
		}
		return index;
	}
	
	public static String sortByStrings(String s,String t){
		if(s == null || t == null ) return "s or t can't be null";
		if(s.length() == 0 || t.length() == 0 ) return "s or t can't length of 0";
		String result = "";
		Letter alphbet [] = new Letter[52];
		for(int i = 0;i<alphbet.length;i++){
			alphbet[i] = new Letter();
		}
		int index = 0;
		char currentChar;
		for(int i = 0;i<s.length();i++){
			currentChar = s.charAt(i);
			index = lowerOrUpper(currentChar);
			alphbet[index].symbol = currentChar;
			alphbet[index].frequency++;
		}
		
		for(int i = 0;i<t.length();i++){
			currentChar = t.charAt(i);
			index = lowerOrUpper(currentChar);
			while(alphbet[index].frequency>0){
				result = result + alphbet[index].symbol;
				alphbet[index].frequency--;
			}
		}
		
		return result;
	}
}

class Letter{
	char symbol;
	int frequency = 0;
}