package br.com.sbm.backend.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.sbm.backend.model.Fruit;
import br.com.sbm.backend.service.FruitService;

@RestController
@RequestMapping("/fruits")
public class FruitController {

	@Autowired
	private FruitService service;

	@GetMapping
	public List<Fruit> getAll() throws SQLException {
		return this.service.getAll();
	}

	@PostMapping
	@Transactional
	public ResponseEntity<Fruit> save(@RequestBody Fruit form) throws SQLException {
		return this.service.save(form);
	}

}
