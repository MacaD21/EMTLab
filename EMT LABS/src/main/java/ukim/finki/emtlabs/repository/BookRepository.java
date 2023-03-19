package ukim.finki.emtlabs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ukim.finki.emtlabs.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
