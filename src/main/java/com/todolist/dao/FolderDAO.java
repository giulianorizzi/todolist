package com.todolist.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todolist.model.Folder;

public interface FolderDAO extends JpaRepository<Folder, Integer>{

}
