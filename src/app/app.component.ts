import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'altrantask';

  changeArray=[]
  userForm:FormGroup
  hobbies:FormArray
  constructor(private formBulider:FormBuilder){
    this.userForm=this.formBulider.group({
      name:['',Validators.required],
      age:['',Validators.required],
      gender:['',Validators.required],
      hobbies:this.formBulider.array([this.createNewHobby()]),
      checked:['',Validators.required]
    })
  }
  validate(event){
    if(event.target.checked==false){
      this.userForm.invalid
    }
  }
  createNewHobby(){
    return this.formBulider.group({
      hobby:['']   
    })
  }

  addHobbyToArray(){
    this.hobbies=this.userForm.get('hobbies') as FormArray
    this.hobbies.push(this.createNewHobby())
  }

  deleteHobbyFromArray(index){
    let hobbiesArray=this.userForm.get('hobbies') as FormArray
    hobbiesArray.removeAt(index)

  }

  addInformation(){
    this.changeArray.push(this.userForm.value)
  }

  deleteRecordFromArray(index){
    this.changeArray.splice(index,1)
  }

  clearFormArray(){
    let hobbiesArray=this.userForm.get('hobbies') as FormArray
    let index=hobbiesArray.length
    while(index > 0){
      hobbiesArray.removeAt(index)
      index--;
    }
  }
  resetForm(){
    this.userForm.reset()
    this.clearFormArray()
  }
 

}
