const ProductPerMonth = {
      soldMonth(orderItem){
         var sold=[0,0,0,0,0,0,0,0,0,0,0,0]
         for(let i=0;i<orderItem.length;i++){
            let month =new Date(orderItem[i].date_added).getMonth()
            sold[parseInt(month)]+=orderItem[i].quantity
         }
         return sold
      }
   }
export default ProductPerMonth