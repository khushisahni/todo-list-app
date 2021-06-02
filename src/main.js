import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';

import { Header } from './components/Header';
import Todos from './components/Todos/Todos';
import { styles as GlobalStyles } from './utils/styles';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: '',
      todos: [],
      inputError: false,
      loading: true,
    };

    this.loadTodos();
  }

  loadTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      console.log('load' + todos);
      this.setState({ todos: JSON.parse(todos) || [], loading: false });
    } catch (e) {
      console.log('Error getting Todo Items >', e);
    }
  };

  save = async () => {
    try {
      AsyncStorage.setItem('todos', JSON.stringify(this.state.todos));
    } catch (e) {
      console.log('Error while storing Todo Items >', e);
    }
  };

  addTodo = () => {
    if (this.state.todo.length === 0) {
      this.setState({ inputError: true });
      return;
    }
    const todos = this.state.todos;
    const todo = {
      title: this.state.todo,
      completed: false,
      createdOn: Date.now(),
      notes: '',
      dueDate: null,
      remindMe: false,
      completedOn: null,
    };
    todos.push(todo);
    this.setState({ todos, todo: '' });
    this.save();
  };

  onDeleteAction = (i) => { 
         todos = this.state.todos; 
         todos.splice(i, 1);
         this.setState({ todos });
          this.save(); 
          };

  checkBoxToggle = (i) => {
    const todos = this.state.todos;
    const todo = todos[i];
    todo.completed = !todo.completed;
    todo.completedOn = todo.completed ? Date.now() : null;
    todos[i] = todo;
    this.setState({ todos });
    this.save();
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="words"
            placeholder="What needs to be done?"
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            onChangeText={(todo) => this.setState({ todo })}
            blurOnSubmit={false}
            onSubmitEditing={this.addTodo}
            value={this.state.todo}
          />

          <View style={styles.todosWrp}>
            <View style={styles.listHeaderWrp}>
              <Text style={styles.listHeader}>Your Todos</Text>
            </View>
            <ScrollView>
              <Todos
                todos={this.state.todos}
                checkBoxToggle={this.checkBoxToggle}
                onDelete={this.onDeleteAction}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'grey',
  },

  textInput: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  listHeaderWrp: {
    marginBottom: 10,
  },
  listHeader: {
    fontSize: GlobalStyles.fontSize,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  todosWrp: { marginTop: 20 },
});
