package br.com.sbm.backend.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.mysql.cj.xdevapi.Statement;

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

	public Long save(Fruit form) throws SQLException {
		String sql = "INSERT INTO fruit (quantity, origin, importDate) " + "VALUES (?, ?, ?)";

		try (PreparedStatement pstm = connection.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS)) {
			pstm.setInt(1, form.getQuantity());
			pstm.setString(2, form.getOrigin());
			pstm.setObject(3, form.getImportDate());

			pstm.execute();

			try (ResultSet rst = pstm.getGeneratedKeys()) {
				if (rst.next()) {
					form.setId(rst.getLong(1));
				};
			} catch (Exception e) {
				new SQLException(e);
			}

		} catch (Exception e) {
			new SQLException(e);
		}
		return form.getId();
	}
}
