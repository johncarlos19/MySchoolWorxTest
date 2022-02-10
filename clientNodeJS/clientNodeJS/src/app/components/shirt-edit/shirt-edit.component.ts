import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {request, GraphQLClient, gql} from 'graphql-request'
import {MatSnackBar} from "@angular/material/snack-bar";


const endpoint = 'http://localhost:8000/graphql/'
const updateShirt = gql`
  mutation update_Shirt($id: Int!, $lenght: String!, $color: String!, $size: Float!){
    updateShirt(id:$id, lenght: $lenght,  color: $color, size: $size ) {
      statu
    }
  }
`
const query = gql`
  query get_Shirt($id:Int!){
    getShirt(id:$id){
      typename
      id
      lenght
      size
      color
    }
  }`


@Component({
  selector: 'app-shirt-edit',
  templateUrl: './shirt-edit.component.html',
  styleUrls: ['./shirt-edit.component.css']
})
export class ShirtEditComponent implements OnInit {
  form: FormGroup;
  sb: MatSnackBar;
  id: string = '';
  action: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private _sb: MatSnackBar) {
    this.form = this.fb.group({
      lenght: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required]
    })
    this.sb = _sb
    let params = new URLSearchParams(document.location.search);

    // @ts-ignore
    this.id = params.get("id");
    // @ts-ignore
    this.action = params.get("action");


  }

  ngOnInit(): void {
    try {
      if (this.id !== null) {
        const variables = {
          id: parseInt(this.id)
        }
        console.log(variables)
        request(endpoint, query, variables).then((data) => {

          console.log(data)
          this.form = this.fb.group({
            lenght: [data.getShirt.lenght, Validators.required],
            size: [data.getShirt.size, Validators.required],
            color: [data.getShirt.color, Validators.required]
          })

          this.sb.open(data.updateShirt.statu, "Close");
        }).then(() => {
          this.router.navigateByUrl('/' + this.action);
        })
      }


    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }
  }

    cancel() {
    this.router.navigateByUrl('/' + this.action);
  }

  edit() {

    try {
      const variables = {
        id: parseInt(this.id),
        lenght: this.form.value.lenght,
        size: this.form.value.size,
        color: this.form.value.color
      }

      console.log(variables)
      request(endpoint, updateShirt, variables).then((data) => {

        // console.log(data)

        this.sb.open(data.updateShirt.statu, "Close");
      }).then(() => {
        this.router.navigateByUrl('/' + this.action);
      })

    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
      console.error(error)

    }


  }

}
