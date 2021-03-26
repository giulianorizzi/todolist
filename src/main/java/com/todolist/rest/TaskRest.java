package com.todolist.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolist.dao.TaskDAO;
import com.todolist.model.Task;

@RestController
@RequestMapping("tasks")
public class TaskRest {

	@Autowired
	private TaskDAO taskDAO;
	
	@PostMapping("/insertar")
	public void insertar(@RequestBody Task task) {
		taskDAO.save(task);
	}
	
	@GetMapping("/listar")
	public List <Task> listar() {
		return taskDAO.findAll();
	}
	
	@DeleteMapping("/eliminar/{id}")
	public void eliminar(@PathVariable("id") int id_task) {
		taskDAO.deleteById(id_task);
	}
	
	@PutMapping("/actualizar")
	public void actualizar(@RequestBody Task task) {
		if(taskDAO.existsById(task.getId_task())) {
			taskDAO.save(task);
		}
	}
}
