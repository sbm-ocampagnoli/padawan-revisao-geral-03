package br.com.sbm.backend.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.sbm.backend.model.Fruit;
import br.com.sbm.backend.repository.FruitRepository;

@Service
public class FruitService {

	
	@Autowired
	private FruitRepository repository;

	public List<Fruit> getAll() throws SQLException {
		return this.repository.getAll();
	}
}
