package com.ssafy.BackEnd.service;

import com.ssafy.BackEnd.entity.Team;
import com.ssafy.BackEnd.entity.TeamMember;
import com.ssafy.BackEnd.entity.TeamMemberIdentity;
import com.ssafy.BackEnd.entity.User;
import com.ssafy.BackEnd.repository.TeamMemberRepository;
import com.ssafy.BackEnd.repository.TeamRespository;
import com.ssafy.BackEnd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TeamMemberServiceImpl implements TeamMemberService {

    private final UserRepository userRepository;

    private final TeamRespository teamRespository;

    private final TeamMemberRepository teamMemberRepository;

    @Override
    public TeamMember addTeamMember(String email, String teamName) { //팀에 팀원 추가하는 기능
        System.out.println("add " + email);
        User user = userRepository.findByEmail(email); //해당 유저정보 가져오기
//        for(User u : user){
//            System.out.println(u.getEmail()+" hihi");
//        }
        //System.out.println(user.getEmail()+" "+teamName+" hihi");
        Team team = teamRespository.findByTitle(teamName); //팀이름으로 해당 팀정보 가
        List<TeamMember> findTeamMember = team.getTeam_member();
        for (TeamMember member : findTeamMember) {
            if (member.getUser().getEmail().equals(email)) {
                return null;
            }
        }
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setTeam_identity(TeamMemberIdentity.MEMBER);

        teamMemberRepository.save(teamMember);

        return teamMember;
    }

    @Override
    @Transactional
    public TeamMember deleteTeamMember(String email, String teamName) {
        Team findTeam = teamRespository.findByTitle(teamName);
        List<TeamMember> findTeamMember = findTeam.getTeam_member();
        for (TeamMember member : findTeamMember) {
            if (member.getUser().getEmail().equals(email)) {
                System.out.println(member.getUser().getEmail().equals(email));
                teamMemberRepository.delete(member);
                findTeamMember.remove(member);
                return member;
            }
        }
        return null;
    }

    @Override
    public Team mergeTeam(Long teamId1, Long teamId2) {
        Team team1 = teamRespository.findById(teamId1).get();
        Team team2 = teamRespository.findById(teamId2).get();
        List<TeamMember> teamMembers2 = team2.getTeam_member();
        for (TeamMember member : teamMembers2) {
            if (member.getTeam_identity().equals(TeamMemberIdentity.LEADER)) {
                member.setTeam_identity(TeamMemberIdentity.MEMBER);
                addTeamMember(member.getUser().getEmail(), team1.getTitle());
            } else {
                addTeamMember(member.getUser().getEmail(), team1.getTitle());
            }
        }
        teamRespository.save(team1);
        teamRespository.delete(team2);
        return team1;

    }

    @Override
    public TeamMember addTeamLeader(String email, Team team) { //팀에 팀원 추가하는 기능
        User user = userRepository.findByEmail(email); //해당 유저정보 가져오기
//        for(User u : user){
//            System.out.println(u.getEmail()+" hihi");
//        }
        //System.out.println(user.getEmail()+" "+teamName+" hihi");
        TeamMember teamMember = new TeamMember();
        teamMember.setTeam(team);
        teamMember.setUser(user);
        teamMember.setTeam_identity(TeamMemberIdentity.LEADER);

        teamMemberRepository.save(teamMember);

        return teamMember;
    }

    @Override
    public List<User> showTeamMemberList(Long team_id) {
        List<TeamMember> teammembers = new ArrayList<>();
        teammembers = teamMemberRepository.showTeamMemberList(team_id);

        List<User> teammembers_infos = new ArrayList<>();

        for (TeamMember teammember_info: teammembers) {
            System.out.println(teammember_info.getUser().getName());

            teammembers_infos.add(teammember_info.getUser());

        }

        for (User info : teammembers_infos) {
            System.out.println("이거 제발 나와라" + info.getName());
        }

        return teammembers_infos;
    }
}



