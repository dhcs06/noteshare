import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../_services/subjectservice';
import { Subject } from '../../_models/subject';
import { isThisWeek } from 'date-fns';

declare var $: any;

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {

  subjects: Subject[];
  

  constructor(private subjectService:SubjectService) {
    
    
   }

   resetAll(code){ 
      if($(`#${code}`).prop( "checked")){ 
        this.reset(code);
      }
   }

   reset(code){ 
    let targy = this.subjects.filter((el) => el.prerequisite.includes(code)); 
    targy.map(x => { 
        if(!$(`#${x.code}`).parent().hasClass("elsofeleves")){ 
          this.resetAll(x.code);  
          $(`#${x.code}`).prop( "disabled", true).prop( "checked", false).parent().removeClass("felveheto").removeClass("elvegzett");
      }
    });
  }

  
  r(arr: Subject[]){ 
    arr.map(x => { 
      x.prerequisite.map(y => { 
        this.reset(y); 
      });
    })
  }

  t(){  
    
    this.subjects.map(x => { 
      if($(`#${x.code}`).prop("checked")){ 
      
        

        let erreElpulok = this.subjects.filter((el) => el.prerequisite.includes(x.code)); 

        erreElpulok.map(y => { 
          let felveheto = []; 
          y.prerequisite.map(z => { 
            felveheto.push($(`#${z}`).prop("checked")); 
          });

          if(!felveheto.includes(false)){ 
            $(`#${y.code}`).parent().addClass("felveheto"); 
            $(`#${y.code}`).prop( "disabled", false);
          }
        });
      }
    });
  }

  creditSav(semeszter){
    let sum = 0;
    this.subjects.map(x => {
      if($(`#${x.code}`).prop("checked") && x.semester==semeszter){
        sum+=x.credit;  
        
      }
      if (sum>4){
        
        $(`#${semeszter}-SAV`).addClass("teljesitett");
        } 
        
        if (sum<5){
          $(`#${semeszter}-SAV`).removeClass("teljesitett");
        }
      
      
      
      
          
      
    
    }
    );
    
    return sum;
  }

  credit(){
    let sum = 0;
    this.subjects.map(x => {
      if($(`#${x.code}`).prop("checked")){
        sum=x.credit+sum;
      }
      
      
    });

    return sum;
  }

  


  event(e:Event){ 
    
    
    let subject = this.subjects.filter((el) => el.prerequisite.includes(e.srcElement.id));
    

    if($(`#${e.srcElement.id}`).prop( "checked")){
      $(`#${e.srcElement.id}`).parent().removeClass("felveheto").addClass("elvegzett");
    } else {
      $(`#${e.srcElement.id}`).parent().addClass("felveheto").removeClass("elvegzett");
      this.r(subject);
    }

    subject.map(x => {
      let mind_igaz = [];

      x.prerequisite.map(y => {
        mind_igaz.push($(`#${y}`).prop("checked"));
      });

      if(!mind_igaz.includes(false)){
        $(`#${x.code}`).prop( "disabled", false);
        $(`#${x.code}`).parent().addClass("felveheto");
      }
    });

    this.t();
    this.credit();
    
  }


   ngOnInit() {
    this.subjectService.getSubjects().subscribe(
      subjects => {
        this.subjects = subjects;
      }
    )
}
} 