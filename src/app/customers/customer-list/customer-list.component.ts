import {Component, OnInit} from '@angular/core';
import {Customer} from '../shared/customer.model';
import {CustomerService} from '../shared/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  // create arrays in typescript
  customers: Customer[];
  customerToDelete: Customer;
  // customerFromAppComponent: Customer;

  // dependency injection: moving the data responsiblity of grabbing the data to the service
  // and that is used in the app component where it is dependency injected
  constructor(private customerService: CustomerService,
              private router: Router) {
    // Ask for a bunch of code to execute
    customerService.getAll().subscribe(
      // Executing and explaining when done and let's me know
      customers => {
        this.customers = customers;
      }
    );
  }

  ngOnInit() {
  }

  details(customer: Customer) {
    this.router.navigateByUrl('/customer/' + customer.id);
  }

  delete(customer: Customer, $event) {
    this.customerToDelete = customer;
    $event.stopPropagation();
  }

  deleteAborted($event) {
    this.customerToDelete = null;
    $event.stopPropagation();

  }

  deleteConfirmed($event) {
    this.customerService.delete(this.customerToDelete.id)
      .switchMap(customer => this.customerService.getAll())
      .subscribe(
        customers => {this.customers = customers;
  });
      // .subscribe(customer => { this.customerService.getAll()
      //   .subscribe(customers => { this.customers = customers;
      // });
    // });
    event.stopPropagation();
  }

  createCustomer() {
    this.router.navigateByUrl('/customers/create');
  }

}
