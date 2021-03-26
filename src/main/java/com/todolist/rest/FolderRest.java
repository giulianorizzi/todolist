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

import com.todolist.dao.FolderDAO;
import com.todolist.model.Folder;

@RestController
@RequestMapping("folders")
public class FolderRest {
	
	@Autowired
	private FolderDAO folderDAO;
	
	@PostMapping("/insertar")
	public void insertar(@RequestBody Folder folder){
		folderDAO.save(folder);
	}
	
	@GetMapping("/listar")
	public List <Folder> listar() {
		return folderDAO.findAll();
	}
	
	@DeleteMapping("/eliminar/{id}")
	public void eliminar(@PathVariable("id") int id_folder) {
		folderDAO.deleteById(id_folder);
	}
	
	@PutMapping("/actualizar")
	public void actualizar(@RequestBody Folder folder) {
		if(folderDAO.existsById(folder.getId_folder())) {
			folderDAO.save(folder);
		}
	}
}
