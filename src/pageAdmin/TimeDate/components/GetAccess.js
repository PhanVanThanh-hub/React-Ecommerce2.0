
const Access = {
   byDay(time) {
      var count =0;
      var countBefore = 0
      if (time !== undefined){
         var growth = 0;
         var today = new Date()
         var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
      
         for (var i=0;i<time.length;i++){
            var dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
             
            if(today.getDate()=== dataTime.getDate()){
                
               count++;
            }
            if(tomorrow.getDate()===dataTime.getDate()){
                
               countBefore++;
            }
         }
         if(countBefore===0){
            growth=100
         }
         else{
            growth=count/(countBefore/100)-100;
         }
          
      }
    
      const data=[count,growth.toFixed(2)]
      return data;
   },
   byWeek(time) {
      var count =0
      var countBefore = 0;
      var curr = new Date; // get current date
      var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      var last = first + 6; // last day is the first day + 6
      var firstday = new Date(curr.setDate(first)) ;
      var curr = new Date;
      var firstdayBefore = new Date(curr.setDate(first-7)) ;
      
      if (time !== undefined){
      
      for (var i=0;i<time.length;i++){
          
         var dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
          
         if(dataTime>=firstday   ){
            console.log("ghy:",dataTime)
            count++;
         } 
         else if(dataTime>=firstdayBefore  && dataTime<firstday){
            console.log("gh1y:",dataTime)
            countBefore++;
         }

      }
      }
  
      const growth=count/(countBefore/100)-100;
      const data=[count,growth.toFixed(2)]
      return data;
   },
   byMonth(time) {
   
      var count =0
      var countBefore = 0
      var date = new Date();
      var growth = 0;
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      var firstDayBefore = new Date(date.getFullYear(), date.getMonth()-1, 1);
      var lastDayBefore = new Date(date.getFullYear(), date.getMonth(), 1);
 
      if (time !== undefined){
         
         for (var i=0;i<time.length;i++){
            
            var dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
         
            if(dataTime>=firstDay  && dataTime<lastDay){
             
               count++;
            }
            if(dataTime>=firstDayBefore  && dataTime<lastDayBefore){
              
               countBefore++;
            }
         }
         if (countBefore===0){
            countBefore=1
         }
         growth=count/(countBefore/100)-100;
      }
      
      const data=[count,growth.toFixed(2)]
      return data;
   },
}
export default Access