export class Validate{
	public static isNumber(value:any):boolean{
		return !isNaN(parseFloat(value)) && isFinite(value);
	}

	public static checkQuantity(quantity:any):boolean{
		if(quantity < 1 ||  !Validate.isNumber(quantity)){		
			return false;
		}
		return true;
	}
}