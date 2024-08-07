package br.com.sbm.backend.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import br.com.sbm.backend.model.Fruit;

@Repository
public class FruitRepository {

	@Autowired
	private Connection connection;

	@Autowired
	public FruitRepository(DataSource dataSource) throws SQLException {
		this.connection = dataSource.getConnection();
	}

	public List<Fruit> getAll() throws SQLException {
		List<Fruit> fruits = new ArrayList<Fruit>();

		String sql = "SELECT id, quantity, origin, importDate FROM fruit";

		try (PreparedStatement pstm = connection.prepareStatement(sql)) {
			pstm.execute();

			try (ResultSet rst = pstm.getResultSet()) {
				while (rst.next()) {
					Fruit fruit = new Fruit();
					fruit.setId(rst.getLong("id"));
					fruit.setQuantity(rst.getInt("quantity"));
					fruit.setOrigin(rst.getString("origin"));
					fruit.setImportDate(rst.getTimestamp("importDate").toLocalDateTime());

					fruits.add(fruit);
				}
			} catch (Exception e) {
				new SQLException(e);
			}
		} catch (Exception e) {
			new SQLException(e);
		}
		return fruits;
	}
}
