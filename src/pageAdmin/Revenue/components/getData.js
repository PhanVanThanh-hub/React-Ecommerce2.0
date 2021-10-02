
const Revenue = {
   
   analyst(order7day,fillterDay,bill7day) {
      var month = new Array();
       month[0] = "January"; month[1] = "February"; month[2] = "March"; month[3] = "April"; month[4] = "May"; month[5] = "June"; month[6] = "July"; month[7] = "August"; month[8] = "September"; month[9] = "October"; month[10] = "November"; month[11] = "December";
      const renvenue = [];
      const days=[]
      const bills=[]
      var nextDay= (order7day[0].data_ordered).substr(0, 10)
      const lastDay =new Date((order7day[0].data_ordered).substr(0, 10));
    
      var nextDay = new Date(nextDay);
      nextDay.setDate(nextDay.getDate());
      lastDay.setDate(lastDay.getDate() + fillterDay);

      var renvenues=0


      for (var i=0;i<order7day.length;i++){
         if( (nextDay.getDate()) == (order7day[i].data_ordered).substring(8, 10)){
            renvenues += parseFloat(order7day[i].total_order)
         }
         else{
            renvenue.push(renvenues)
            renvenues=0
            days.push(nextDay.getDate()+"-"+month[nextDay.getMonth()])
            nextDay.setDate(nextDay.getDate() + 1);
            i-=1
         }

      }
      renvenue.push(renvenues)
      days.push(nextDay.getDate()+"-"+month[nextDay.getMonth()])
      
      var nextDay1 = new Date((order7day[0].data_ordered).substr(0, 10))
      nextDay1.setDate(nextDay1.getDate());
      var billcost =0
      for(var i=0;i<bill7day.length;i++){
         if(nextDay1.getDate()==(bill7day[i].date_create).substring(8, 10)){   
            billcost +=parseFloat(parseFloat(bill7day[i].amount)*parseFloat(bill7day[i].cost))
         }
         else{
            bills.push(billcost)
            billcost=0
            i-=1
            nextDay1.setDate(nextDay1.getDate()+1);
         }
      }
      bills.push(billcost)
      const data=[bills,days,renvenue]
      return data
   },
   analystMonth(monthRevenue){
      var month = new Array();
      month[0] = "January"; month[1] = "February"; month[2] = "March"; month[3] = "April"; month[4] = "May"; month[5] = "June"; month[6] = "July"; month[7] = "August"; month[8] = "September";month[9] = "October";month[10] = "November";month[11] = "December";    

      var cost =[]
      var profit =[]
      var revenue = []
      for(var i =0 ;i<monthRevenue.length;i++){
         cost.push(monthRevenue[i].total_cost)
         profit.push(monthRevenue[i].total_profit)
         revenue.push(monthRevenue[i].total_revenue)
      }
      const data=[cost,month,revenue,profit]
      return data
   }
}
export default Revenue