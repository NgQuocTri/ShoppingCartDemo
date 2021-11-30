export class Helpers{
	public static toCurrency(price:number,currencyUnit:string,position:string = "left"):string{
		if (position == "left"){
			return currencyUnit+" "+ price;
		}
		else if(position == "right"){
			return price +" "+ currencyUnit;
		}

	}
}