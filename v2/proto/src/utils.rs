use std::iter::Flatten;

pub trait DefaultWithId: Sized {
    fn create_with_id(id: usize) -> Self;
}

#[derive(Clone)]
pub struct IdPool<T> {
    id_pool: Vec<usize>,
    objects: Vec<Option<T>>,
}

impl<T: DefaultWithId> IdPool<T> {
    pub fn new() -> Self {
        Self {
            id_pool: vec![],
            objects: vec![],
        }
    }

    pub fn generate(&mut self) -> usize {
        match self.id_pool.pop() {
            Some(id) => {
                self.objects[id] = Some(T::create_with_id(id));
                id
            }
            None => {
                let id = self.objects.len();
                self.objects.push(Some(T::create_with_id(id)));
                id
            }
        }
    }

    pub fn release(&mut self, id: usize) {
        if id >= self.objects.len() {
            panic!("Tried to release an ID that was never generated!")
        };
        self.objects[id] = None;
        self.id_pool.push(id);
    }

    pub fn get(&mut self, id: usize) -> Option<&mut T> {
        self.objects[id].as_mut()
    }

    pub fn iter<'a>(&'a self) -> Flatten<std::slice::Iter<'a, Option<T>>> {
        self.objects.iter().flatten()
    }

    pub fn len(&self) -> usize {
        return self.objects.len() - self.id_pool.len();
    }
}

#[cfg(test)]
mod test {
    use super::DefaultWithId;

    struct EmptyItem {}
    impl DefaultWithId for EmptyItem {
        fn create_with_id(id: usize) -> Self {
            Self {}
        }
    }
    type EmptyPool = super::IdPool<EmptyItem>;

    #[test]
    fn test_len() {
        let mut pool = EmptyPool::new();
        assert_eq!(pool.len(), 0);
        let p: usize = pool.generate();
        let p3: usize = pool.generate();
        assert_eq!(pool.len(), 2);
        pool.release(p);
        assert_eq!(pool.len(), 1);
        let p: usize = pool.generate();
        let p2: usize = pool.generate();
        assert_eq!(pool.len(), 3);
        pool.release(p);
        pool.release(p2);
        assert_eq!(pool.len(), 1);
        pool.release(p3);
        assert_eq!(pool.len(), 0);
        pool.generate();
        assert_eq!(pool.len(), 1);
    }
}

