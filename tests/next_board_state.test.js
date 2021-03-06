const { next_board_state } = require('../game_of_life.js');
  
test('dead cells with no live neighbors should stay dead', () => {
    init_state1 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    expected_next_state1 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    actual_next_state1 = next_board_state(init_state1)

    expect(actual_next_state1).toEqual(expected_next_state1);
  });

  test('dead cells with exactly 3 neighbors should come alive', () => {
    init_state2 = [
        [0,0,1],
        [0,1,1],
        [0,0,0]
    ]
    expected_next_state2 = [
        [0,1,1],
        [0,1,1],
        [0,0,0]
    ]
    actual_next_state2 = next_board_state(init_state2)
    expect(actual_next_state2).toEqual(expected_next_state2);
  });

  test('toad board', () => {
    init_state3 = [
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,1,1,1,0],
        [0,1,1,1,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0]
    ]
    expected_next_state3 = [
        [0,0,0,0,0,0],
        [0,0,0,1,0,0],
        [0,1,0,0,1,0],
        [0,1,0,0,1,0],
        [0,0,1,0,0,0],
        [0,0,0,0,0,0]
    ]
    expected_next_state3 = next_board_state(init_state3)
    expect(expected_next_state3).toEqual(expected_next_state3);
  });