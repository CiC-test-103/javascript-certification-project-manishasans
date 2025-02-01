// Necessary Imports (you will need to use this)
const { Student } = require('./Student');

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let current, previous;
    if(!this.head){
      this.head = new Node(newStudent,this.head);
    }
    else{
      const node = new Node(newStudent);
      current = this.head;
      while(current.next){
        previous = current
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
    console.log('Linked List',this.head,'Size',this.length);
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if (!this.head){
      console.log("Empty Linked List !!!");
      return;
    }
    if (!email){
      console.log("Email Entered is Null !!! Please enter a valid email id. ");
      return;
    }
    let current = this.head;
    let previous;
    if (current.data.includes(email)) {
      console.log(`Removed Student ${current.data}`);
      this.head = current.next;
      this.length--;
      console.log('New List is ',this.head);
    }
    else {
      previous = current;
      while (current){
        if (current.data.includes(email)) {
          console.log('Removed Student ',current.data);
          previous.next = current.next;
          this.length--;
          console.log('New List is ',this.head);
          return
        }
        previous = current;
        current = current.next;
        console.log(current);
      }
    return -1
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    if (!this.head){
      console.log("Empty Linked List !!!");
      return;
    }
    let current = this.head;
    while (current){
      if (current.data.includes(email)){
        console.log('Student Name is  ',current.data);
        return current.data;
      }
      current = current.next;
    }
    console.log("Student Not Found!!!");
    return -1
  }


  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    if (!this.head){
      console.log("Empty Linked List !!!");
      return;
    }
    let current=this.head;
    let count = 1;
    while (current){
      console.log(count,current.data);
      count++;
      current = current.next;
    }
    return "";
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  sortStudentsByName() {
    // TODO
    console.log('Hi Sorting.........');
    const fs = require('fs');
    console.log("Begin");
    fs.readFile("data.json",'utf8',(err,data) =>{
      if (err){
        console.log("Error Reading file ...");
        return;
      }
      ///console.log("File Data is ...:",data);
      let current = JSON.parse(data);
      const nameArray = current.map(item=>item.name);
      const sorted=nameArray.sort();
      console.log('Sorted by Name : ',sorted);
      return sorted;
    });
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    const fs = require('fs');
    console.log("Begin");
    fs.readFile("data.json",'utf8',(err,data) =>{
      if (err){
        console.log("Error Reading file ...");
        return;
      }
      ///console.log("File Data is ...:",data);
      let current = JSON.parse(data);
      let filtered = current.filter(item=>item.specialization===specialization);
      const nameArray = filtered.map(item=>item.name);
      const sorted=nameArray.sort();
      console.log('Filtered & Sorted by Specialization',sorted);
      return sorted;
    });
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    const fs = require('fs');
    console.log("Begin");
    fs.readFile("data.json",'utf8',(err,data) =>{
      if (err){
        console.log("Error Reading file ...");
        return;
      }
      ///console.log("File Data is ...:",data);
      let current = JSON.parse(data);
      const numbArray = current.map(item=>item.year);
      console.log(numbArray);
      const minNumb = Math.min(...numbArray);
      console.log(minNumb);
      let filtered = current.filter(item=>item.year === minNumb);
      const nameArray = filtered.map(item=item.name);
      const sorted=nameArray.sort();
      console.log('Filtered & Sorted by Year',sorted);
      return sorted;
    });
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    console.log(fileName);
    const fs = require('fs').promises;
    console.log("Began");
     //
    try{
      const data = await fs.readFile(fileName, 'utf8');
      console.log("Student File is : ",data);
      const newcontent = data +"\n"+ JSON.stringify(this.head);
      await fs.writeFile(fileName,newcontent,'utf8');
      console.log("Student Linked List updated successfully!!!");
    }
    catch(error){
      console.log("Error");
    }
    console.log("Finished");
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    const fs = require('fs').promises;
    console.log("Begin");
    try{
      const data = await fs.readFile(fileName, 'utf8');
      console.log("File Content is : ",data);
    }
    catch(error){
      console.log("Error");
    }
    console.log("Finish");
  }

}

module.exports = { LinkedList }
