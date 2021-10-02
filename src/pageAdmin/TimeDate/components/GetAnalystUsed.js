
const AnalystsUsed = {
   total(time) {
      var timeUsed=0
      for(var i=0;i<time.length;i++){
         var dataTimeStart =new Date(time[i].start);
         var dataTimeEnd =new Date(time[i].end);
         var ti = dataTimeEnd-dataTimeStart
         timeUsed +=ti
          
      }
      
      return timeUsed;
   },
   average(time) {
      var timeUsed=0
      for(var i=0;i<time.length;i++){
         var dataTimeStart =new Date(time[i].start);
         var dataTimeEnd =new Date(time[i].end);
         timeUsed +=dataTimeEnd-dataTimeStart
         
      }
     
      return timeUsed/time.length;
   },
}
export default AnalystsUsed