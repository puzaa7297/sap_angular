import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  email: string;
  password: string;
  role: 'customer' | 'salesman';
}

interface Food {
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {

  // ================= AUTH =================
  isLoginMode = true;
  currentUser: User | null = null;

  email = '';
  password = '';
  role: 'customer' | 'salesman' = 'customer';

  users: User[] = [];

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.email = '';
    this.password = '';
  }

  signUp() {
    if (!this.email || !this.password) return;

    const exists = this.users.find(u => u.email === this.email);
    if (exists) {
      alert('User already exists');
      return;
    }

    this.users.push({
      email: this.email,
      password: this.password,
      role: this.role
    });

    alert('Signup successful. Please login.');
    this.isLoginMode = true;
  }

  login() {
    const user = this.users.find(
      u => u.email === this.email && u.password === this.password
    );

    if (user) {
      this.currentUser = user;
      this.email = '';
      this.password = '';
    } else {
      alert('Invalid credentials');
    }
  }

  logout() {
    this.currentUser = null;
    this.cart = [];
  }

  // ================= FOOD DATA =================
  foods: Food[] = [
    { name: 'Pizza', price: 299 },
    { name: 'Burger', price: 199 },
    { name: 'Biryani', price: 249 }
  ];

  // ================= CUSTOMER =================
  cart: Food[] = [];

  addToCart(food: Food) {
    this.cart.push(food);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  // ================= SALESMAN =================
  foodName = '';
  foodPrice = 0;
  editIndex: number | null = null;

  addFood() {
    if (!this.foodName || this.foodPrice <= 0) return;

    this.foods.push({
      name: this.foodName,
      price: this.foodPrice
    });

    this.clearForm();
  }

  editFood(index: number) {
    this.foodName = this.foods[index].name;
    this.foodPrice = this.foods[index].price;
    this.editIndex = index;
  }

  updateFood() {
    if (this.editIndex !== null) {
      this.foods[this.editIndex] = {
        name: this.foodName,
        price: this.foodPrice
      };
      this.editIndex = null;
      this.clearForm();
    }
  }

  deleteFood(index: number) {
    this.foods.splice(index, 1);
  }

  clearForm() {
    this.foodName = '';
    this.foodPrice = 0;
  }
}
