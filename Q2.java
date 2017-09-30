import java.util.LinkedList;

/*
 * I use a tree structure, each tree node will have one character from the urls
 * so that for this data structure, we only store the entire url. When a new url 
 * arrives, there will be an unique traversal path for that specific url in this tree
 * structure; however when an already visited url comes in, the traversal path
 * already exists. For example, when we at last character of the url and we still find
 * a tree node with same value, that  means the incoming url has same traversal path the
 * previous url has, we can conclude that this url is already visited.
 */

public class Q2 { 
	public static void main(String[]args){
		
		urlNode url = new urlNode();
		String urlArr[] = {"www.google.com", "www.gmail.com", "www.facebook.com",
		"www.youtube.com", "www.google.com", "www.facebook.com","www.facebook.com","www.gmail.com"};
		urlNode current = new urlNode();
		int index = 0;
		boolean notFound = false;
		for(int i = 0; i< urlArr.length;i++){
			current = url;
			for(int j = 0; j< urlArr[i].length();j++){		
				if(current.urls.isEmpty()){
					current.urls.add(new urlNode(urlArr[i].charAt(j)));
					current = current.urls.getFirst();
				}else{
					for(int k = 0; k < current.urls.size();k++){
						if(current.urls.get(k).val == urlArr[i].charAt(j)){
							current = current.urls.get(k);
							index++;
							notFound = true;
							break;
						}
					}
					if(!notFound){
						current.urls.add(new urlNode(urlArr[i].charAt(j)));
						current = current.urls.getLast();
					}	
				}
				notFound = false;
			}
			if(index == urlArr[i].length()){
				System.out.println(urlArr[i] + " is already visited");
			}
			index = 0;
		}
		
	}
}

class urlNode{
	char val;
	LinkedList<urlNode> urls = new LinkedList<urlNode>();
	
	urlNode(){}
	urlNode(char val){
		this.val = val;
	}
	
}