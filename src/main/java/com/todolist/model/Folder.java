package com.todolist.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Folder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_folder;
	
	@Column
	private String name;
	
	@JsonManagedReference
	@OneToMany(
			mappedBy = "folder",
			cascade = CascadeType.ALL
	)
	private List<Task> tasks;

	public int getId_folder() {
		return id_folder;
	}

	public void setId_folder(int id_folder) {
		this.id_folder = id_folder;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks.clear();
		this.tasks.addAll(tasks);
	}
}
